import { Paper } from "./Paper";
import ATSClassicPreview from "./ATSClassicPreview";
import ATSModernPreview from "./ATSModernPreview";
import CreativePreview from "./CreativePreview";
export const previewById = { classic: ATSClassicPreview, modern: ATSModernPreview, creative: CreativePreview } as const;
export type TemplateId = keyof typeof previewById;
export function TemplatePaper({ id, scale }: { id: TemplateId; scale: number }) {
  const P = previewById[id];
  return <Paper scale={scale}><P /></Paper>;
}
