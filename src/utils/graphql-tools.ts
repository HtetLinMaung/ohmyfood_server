import fs from "fs";
import path from "path";
import { rootDir } from "../constants";

export const importSchema = (filePath: string) =>
  fs.readFileSync(path.join(rootDir, filePath), "utf-8");

export const mergeSchema = (schemaArray: string[] = []) => {
  let gql = "schema { query: RootQuery } type RootQuery { ";
  for (const schema of schemaArray) {
    if (schema.match(/mutation:\s+RootMutation/)) {
      gql =
        "schema { query: RootQuery, mutation: RootMutation } type RootQuery { ";
      break;
    }
  }
  for (const schema of schemaArray) {
    const match = schema.match(
      /type\s+RootQuery\s+{((\s+\w+(\(.+\))?:\s+\[?\w+!?\]?)+\s+)}/
    );
    if (match) {
      gql += match[1];
    }
  }
  gql += "} type RootMutation { ";
  for (const schema of schemaArray) {
    const match = schema.match(
      /type\s+RootMutation\s+{((\s+\w+(\(.+\))?:\s+\w+!?)+\s+)}/
    );
    if (match) {
      gql += match[1];
    }
  }
  gql += "} ";

  for (const schema of schemaArray) {
    gql += schema
      .replace(
        /type\s+RootQuery\s+{((\s+\w+(\(.+\))?:\s+\[?\w+!?\]?)+\s+)}/,
        ""
      )
      .replace(/schema\s+{\s+((\w+:\s+\w+!?\s+)+)}/, "")
      .replace(/type\s+RootMutation\s+{((\s+\w+(\(.+\))?:\s+\w+!?)+\s+)}/, "");
  }
  
  return gql;
};
