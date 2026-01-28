declare const _globalThis: {
  [key: string]: any;
  Zotero: _ZoteroTypes.Zotero;
  ztoolkit: ZToolkit;
  addon: typeof addon;
};

declare type ZToolkit = ReturnType<
  typeof import("../src/utils/ztoolkit").createZToolkit
>;

declare const ztoolkit: ZToolkit;

declare const rootURI: string;

declare const addon: import("../src/addon").default;

declare const __env__: "production" | "development";

// 为全局 Zotero 对象添加类型，支持动态插件属性访问
declare const Zotero: _ZoteroTypes.Zotero & { [key: string]: any };

// declare namespace Zotero {
//   interface Item {
//     getField(field: string): any;
//   }

//   namespace Translate {
//     class Search {
//       constructor();
//       setIdentifier(identifier: string): void;
//       getTranslators(): Promise<any[]>;
//       setTranslator(translators: any[]): void;
//       translate(options: { libraryID: number; collections: number[] | false; saveAttachments: boolean; }): Promise<Item[]>;
//     }
//   }

//   namespace Server {
//     namespace Endpoints {
//       [key: string]: any;
//     }
//   }

//   namespace Collections {
//     function getByLibraryAndKey(libraryID: number, key: string): any;
//   }

//   namespace Libraries {
//     var userLibraryID: number;
//   }

//   namespace Utilities {
//     function extractIdentifiers(identifierStr: string): string[];
//   }

//   function logError(e: any): void;
// }
