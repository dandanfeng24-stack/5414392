import { DatabaseClient } from "./DatabaseClient";
import { projects, themes } from "@/lib/data";

export default function DatabasePage() {
  return <DatabaseClient projects={projects} themes={themes} />;
}
