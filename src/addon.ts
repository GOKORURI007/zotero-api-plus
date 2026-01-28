import { config } from "../package.json";
import { ColumnOptions, DialogHelper } from "zotero-plugin-toolkit";
import hooks from "./hooks";
import { createZToolkit } from "./utils/ztoolkit";

// Define the AddItemEndpoint class
class AddItemEndpoint {
  supportedMethods = ["POST"];
  supportedDataTypes = ["application/json"];
  permitBookmarklet = true;

  async init(req: { data: { identifier: string; collectionKey?: string } }) {
    try {
      const data = req.data;
      const identifierStr = data.identifier;
      const collectionKey = data.collectionKey;

      if (!identifierStr) {
        return [400, "text/plain", "Error: No identifier provided"];
      }

      const identifiers = Zotero.Utilities.extractIdentifiers(identifierStr);
      if (!identifiers.length) {
        return [400, "text/plain", "Error: Could not parse identifier"];
      }

      const libraryID = Zotero.Libraries.userLibraryID;
      let collections: number[] | false = false;

      if (collectionKey) {
        const col = Zotero.Collections.getByLibraryAndKey(
          libraryID,
          collectionKey,
        );
        if (col) {
          collections = [col.id];
        }
      }

      const newItems: Zotero.Item[] = [];
      for (const identifier of identifiers) {
        const translate = new Zotero.Translate.Search();
        translate.setIdentifier(identifier);

        const translators = await translate.getTranslators();
        if (!translators.length) continue;

        translate.setTranslator(translators);

        try {
          const items = await translate.translate({
            libraryID,
            collections,
            saveAttachments: true,
          });
          newItems.push(...items);
        } catch (e: any) {
          Zotero.logError(e);
        }
      }

      if (newItems.length > 0) {
        return [
          200,
          "application/json",
          JSON.stringify({
            status: "success",
            addedCount: newItems.length,
            titles: newItems.map((i) => i.getField("title")),
          }),
        ];
      } else {
        return [404, "text/plain", "Failed to find or save any items."];
      }
    } catch (e: any) {
      return [500, "text/plain", "Internal Server Error: " + e.message];
    }
  }
}

Zotero.Server.LocalAPI.Plus = class extends Zotero.Server.LocalAPI.Schema {
  supportedMethods = ["GET"];

  async run(_: any): Promise<[number, string, string]> {
    return [200, "plain/text", "Zotero Local API Plus is running."];
  }
};

class Addon {
  public data: {
    alive: boolean;
    config: typeof config;
    // Env type, see build.js
    env: "development" | "production";
    initialized?: boolean;
    ztoolkit: ZToolkit;
    locale?: {
      current: any;
    };
    prefs?: {
      window: Window;
      columns: Array<ColumnOptions>;
      rows: Array<{ [dataKey: string]: string }>;
    };
    dialog?: DialogHelper;
  };
  // Lifecycle hooks
  public hooks: typeof hooks;
  // APIs
  public api: object;

  constructor() {
    this.data = {
      alive: true,
      config,
      env: __env__,
      initialized: false,
      ztoolkit: createZToolkit(),
    };
    this.hooks = hooks;
    this.api = {};
  }

  public registerEndpoints() {
    // Register the new endpoint
    Zotero.Server.Endpoints["api/plus/addItemByIdentifier"] = AddItemEndpoint;
    Zotero.Server.Endpoints["/api/plus"] = Zotero.Server.LocalAPI.Plus;
    ztoolkit.log("Registering Local API Plus endpoint");
    ztoolkit.log(Zotero.Server.LocalAPI.Plus);
  }
}

export default Addon;
