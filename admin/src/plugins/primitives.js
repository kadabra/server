import { registerPrimitive } from "vue-primitives";
import Vue from "vue";

registerPrimitive(Vue, "div", "box", ["flex", "column"]);
registerPrimitive(Vue, "span", "txt");
registerPrimitive(Vue, "div", "row", ["flex"]);
registerPrimitive(Vue, "div", "column", ["flex", "column"]);
registerPrimitive(Vue, "div", "wrapper", ["flex", "center"]);
