import { RenderManualFieldExtensionConfigScreenCtx } from "datocms-plugin-sdk";
import { Canvas, Form, TextField, SelectField } from "datocms-react-ui";
import { useCallback, useMemo, useState } from "react";

interface MonacoConfigProps {
  ctx: RenderManualFieldExtensionConfigScreenCtx;
}

export interface Parameters {
  height: number;
  languageField: {
    label: string;
    value: string;
  };
}

export default function MonacoConfig({ ctx }: MonacoConfigProps) {
  const [formValues, setFormValues] = useState<Partial<Parameters>>(
    ctx.parameters
  );
  const update = useCallback(
    (field, value) => {
      const newParameters = { ...formValues, [field]: value };
      setFormValues(newParameters);
      ctx.setParameters(newParameters);
    },
    [formValues, setFormValues, ctx.setParameters]
  );

  const fieldOptions = useMemo(
    () =>
      Object.keys(ctx.fields).map((k) => ({
        label: ctx.fields[k]!.attributes.label,
        value: ctx.fields[k]!.attributes.api_key,
      })),
    [ctx]
  );

  return (
    <Canvas ctx={ctx}>
      <Form>
        <TextField
          textInputProps={{ type: "number" }}
          id="height"
          name="height"
          label="height"
          required
          value={formValues.height}
          onChange={update.bind(null, "height")}
        />
        <SelectField
          id="languageField"
          name="languageField"
          label="Language field"
          value={formValues.languageField}
          selectInputProps={{
            options: fieldOptions,
          }}
          onChange={update.bind(null, "languageField")}
        />
      </Form>
    </Canvas>
  );
}
