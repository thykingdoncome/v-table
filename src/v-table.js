import ViTable  from '../src/components/ViTable.vue'

// This is your plugin object. It can be exported to be used anywhere.
const VTable = {
    // The install method is all that needs to exist on the plugin object.
    // It takes the global Vue object as well as user-defined options.
    install(Vue, options) {
      options;
      // We call Vue.mixin() here to inject functionality into all components.
        Vue.mixin({
        // Anything added to a mixin will be injected into all components.
        // In this case, the mounted() method runs when the component is added to the DOM.
        mounted() {
          return ViTable
        }
      });
    }
  };
  
  export default VTable;