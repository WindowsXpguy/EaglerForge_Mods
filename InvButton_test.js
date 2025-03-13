// Create a button that appears when the player opens their inventory
function createInventoryButton() {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);
    
    var myButton = buttonConstructor(999, 10, 10, 100, 20, ModAPI.util.str("Click Me"));
    
    // Hook into the inventory GUI initialization
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.inventory.GuiInventory", "initGui")] = function (...args) {
        var gui = ModAPI.util.wrap(args[0]).getCorrective();
        gui.buttonList.add(myButton);
    };
    
    // Hook into button click event
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.inventory.GuiInventory", "actionPerformed")] = function (button) {
        if (button.id === 999) {
            alert("Button Clicked!");
        }
    };
}

// Call function to create the button in inventory GUI
createInventoryButton();
