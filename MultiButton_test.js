// Function to create the main button that opens another menu in the Options GUI
function createMainButton() {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);
    
    var originalInitGui = ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiOptions", "initGui")];

    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiOptions", "initGui")] = function (...args) {
        originalInitGui.apply(this, args); // Ensure the original GUI elements load

        var gui = ModAPI.util.wrap(args[0]).getCorrective();
        var mainButton = buttonConstructor(1000, gui.width - 110, 10, 100, 20, ModAPI.util.str("Open Menu"));
        gui.buttonList.add(mainButton);
    };

    // Hook into button click event
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiOptions", "actionPerformed")] = function (button) {
        if (button.id === 1000) {
            ModAPI.minecraft.displayGuiScreen(new CustomMenu());
        }
    };
}

// Custom menu with two buttons
function CustomMenu() {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);

    this.initGui = function () {
        var gui = ModAPI.util.wrap(this).getCorrective();
        this.buttonList.add(buttonConstructor(2000, 10, 10, 100, 20, ModAPI.util.str("Button 1")));
        this.buttonList.add(buttonConstructor(2001, 10, 40, 100, 20, ModAPI.util.str("Button 2")));
    };
    
    this.actionPerformed = function (button) {
        if (button.id === 2000) {
            alert("Button 1 Clicked!");
        } else if (button.id === 2001) {
            alert("Button 2 Clicked!");
        }
    };
}

// Call function to create the main button in the Options GUI
createMainButton();
