import Editor, { OnChange } from "@monaco-editor/react";
import get from "lodash/get";
import { RenderFieldExtensionCtx } from "datocms-plugin-sdk";
import { Canvas } from "datocms-react-ui";
import { useCallback } from "react";
import { Parameters } from "./MonacoConfig";

interface MonacoEditorProps {
  ctx: RenderFieldExtensionCtx;
}

export default function MonacoEditor({ ctx }: MonacoEditorProps) {
  const parameters: Parameters = ctx.parameters as unknown as Parameters;
  const language =
    (get(ctx.formValues, ctx.fieldPath.replace(/\w+$/, parameters.languageField.value)) as string) ?? "text";
  const onChange = useCallback<OnChange>(
    (v) => v && ctx.setFieldValue(ctx.fieldPath, v),
    [ctx]
  );
  const value = get(ctx.formValues, ctx.fieldPath, "") as string;

  return (
    <Canvas ctx={ctx}>
      <Editor
        language={language}
        onChange={onChange}
        height={500}
        value={value}
      />
    </Canvas>
  );
}
