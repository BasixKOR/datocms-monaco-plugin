import { connect } from "datocms-plugin-sdk";
import { render } from "./utils/render";
import ConfigScreen from "./entrypoints/ConfigScreen";
import "datocms-react-ui/styles.css";
import MonacoEditor from "./entrypoints/MonacoEditor";
import MonacoConfig from "./entrypoints/MonacoConfig";

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions(ctx) {
    if (ctx.plugin.attributes.parameters.autoApply) return [];
    return [
      {
        id: "monaco",
        name: "Monaco Editor",
        type: "editor",
        fieldTypes: ["text"],
        configurable: true,
      }
    ]
  },
  renderManualFieldExtensionConfigScreen(fieldExtensionId, ctx) {
    switch(fieldExtensionId) {
      case "monaco":
        return render(<MonacoConfig ctx={ctx} />)
    }
  },
  renderFieldExtension(fieldExtensionId, ctx) {
    if (ctx.plugin.attributes.parameters.autoApply) return;
    switch (fieldExtensionId) {
      case "monaco":
        return render(<MonacoEditor ctx={ctx} />);
    }
  },
});
