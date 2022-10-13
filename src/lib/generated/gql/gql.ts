/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "query GetConferences {\n  conferences {\n    id\n    name\n    city\n    talks {\n      id\n      title\n      summary\n    }\n  }\n}": types.GetConferencesDocument,
};

export function graphql(source: "query GetConferences {\n  conferences {\n    id\n    name\n    city\n    talks {\n      id\n      title\n      summary\n    }\n  }\n}"): (typeof documents)["query GetConferences {\n  conferences {\n    id\n    name\n    city\n    talks {\n      id\n      title\n      summary\n    }\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;