// Function to create an X-ray button in the Options GUI
function createXrayButton() {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);
    
    var originalInitGui = ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiOptions", "initGui")];

    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiOptions", "initGui")] = function (...args) {
        originalInitGui.apply(this, args); // Ensure the original GUI elements load

        var gui = ModAPI.util.wrap(args[0]).getCorrective();
        var xrayButton = buttonConstructor(3000, gui.width - 110, 40, 100, 20, ModAPI.util.str("X-ray"));
        gui.buttonList.add(xrayButton);
    };

    // Hook into button click event
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiOptions", "actionPerformed")] = function (button) {
        if (button.id === 3000) {
            var confirm = confirm("Do you want to visit the X-ray texture pack page?");
            if (confirm) {
                window.open("https://www.curseforge.com/minecraft/texture-packs/xray-ultimate-1-11-compatible/files/2229911", "_blank");
            }
        }
    };
}

// Call function to create the X-ray button in the Options GUI
createXrayButton();
