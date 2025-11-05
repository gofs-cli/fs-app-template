import "htmx.org";
import Alpine from "alpinejs";
import initToastComponent from "./components/toast/toast";

window.Alpine = Alpine;

initToastComponent();

Alpine.start();
