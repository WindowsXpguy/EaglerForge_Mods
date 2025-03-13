// Utility function to create and manage buttons
function button_utility_script(inputArr, bindingClass, removeOnOpen) {
    var button = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton").constructors.find(x => x.length === 6);
    var originalInit = ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "initGui")];

    var out = inputArr.map(x => button(x.uid, x.x, x.y, x.w, x.h, ModAPI.util.str(x.text)));

    // Hook into the GUI initialization
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "initGui")] = function (...args) {
        originalInit.apply(this, args);
        if (removeOnOpen) {
            var gui = ModAPI.util.wrap(args[0]).getCorrective();
            gui.buttonList.clear(); // Remove buttons when opening the GUI
        }
    };

    // Add button when NOT in options menu
    if (!removeOnOpen) {
        ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "drawScreen")] = function (...args) {
            var gui = ModAPI.util.wrap(args[0]).getCorrective();
            var screenWidth = gui.width;
            out.forEach(guiButton => {
                guiButton.xPosition = screenWidth - 110; // Position dynamically
                gui.buttonList.add(guiButton);
            });
        };
    }
}

// Define the floating button
var floatingButton = [{
    text: "Click Me",
    click: () => {
        alert("Button Clicked!");
    },
    x: 0,   // X position (set dynamically)
    y: 10,  // Y position (always visible at the top)
    w: 100,  // Width
    h: 20,   // Height
    uid: 999999  // Unique button ID
}];

// Add button to HUD (always visible)
button_utility_script(floatingButton, "net.minecraft.client.gui.GuiIngame", false);

// Remove the button when Options GUI is opened
button_utility_script([], "net.minecraft.client.gui.GuiOptions", true);
