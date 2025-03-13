// Function to create the main button that opens a confirmation dialog
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
            var confirm = confirm("Do you want to enter the menu?");
            if (confirm) {
                ModAPI.minecraft.displayGuiScreen(new CustomMenu());
            }
        }
    };
}

// Custom menu with two buttons positioned on each side
function CustomMenu() {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);

    this.initGui = function () {
        var gui = ModAPI.util.wrap(this).getCorrective();
        this.buttonList.add(buttonConstructor(2000, 10, gui.height / 2 - 10, 100, 20, ModAPI.util.str("Left Button")));
        this.buttonList.add(buttonConstructor(2001, gui.width - 110, gui.height / 2 - 10, 100, 20, ModAPI.util.str("Right Button")));
    };
    
    this.actionPerformed = function (button) {
        if (button.id === 2000) {
            alert("Left Button Clicked!");
        } else if (button.id === 2001) {
            alert("Right Button Clicked!");
        }
    };

    this.drawScreen = function (mouseX, mouseY, partialTicks) {
        this.drawDefaultBackground();
        this.drawCenteredString(ModAPI.mc.fontRenderer, "Custom Menu", this.width / 2, 20, 0xFFFFFF);
        this.superDrawScreen(mouseX, mouseY, partialTicks);
    };
}

// Call function to create the main button in the Options GUI
createMainButton();
