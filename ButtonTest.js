// Utility function to add and remove buttons dynamically
function button_utility_script(inputArr, bindingClass, removeOnOpen) {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);
    var originalInit = ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "initGui")];

    var buttonInstances = inputArr.map(x => buttonConstructor(x.uid, x.x, x.y, x.w, x.h, ModAPI.util.str(x.text)));

    // Hook into the GUI initialization
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "initGui")] = function (...args) {
        originalInit.apply(this, args);
        var gui = ModAPI.util.wrap(args[0]).getCorrective();

        if (removeOnOpen) {
            // Remove ONLY the floating button, NOT all buttons
            gui.buttonList = gui.buttonList.filter(btn => !inputArr.some(x => x.uid === btn.id));
        } else {
            // Add the button only when NOT in options GUI
            var screenWidth = gui.width;
            buttonInstances.forEach(guiButton => {
                guiButton.xPosition = screenWidth - 110; // Place in top-right corner
                gui.buttonList.add(guiButton);
            });
        }
    };
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

// Add the button to the HUD (always visible)
button_utility_script(floatingButton, "net.minecraft.client.gui.GuiIngame", false);

// Ensure ONLY our button is removed when opening Options GUI
button_utility_script(floatingButton, "net.minecraft.client.gui.GuiOptions", true);
