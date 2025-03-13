// Function to create the main button that opens another menu
function createMainButton() {
    var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
    var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);
    
    var mainButton = buttonConstructor(1000, 10, 10, 150, 20, ModAPI.util.str("Open Menu"));
    
    // Hook into the GUI initialization
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiScreen", "initGui")] = function (...args) {
        var gui = ModAPI.util.wrap(args[0]).getCorrective();
        gui.buttonList.add(mainButton);
    };
    
    // Hook into button click event
    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.gui.GuiScreen", "actionPerformed")] = function (button) {
        if (button.id === 1000) {
            ModAPI.minecraft.displayGuiScreen(new CustomMenu());
        }
    };
}

// Custom menu with two buttons
function CustomMenu() {
    this.initGui = function () {
        var buttonClass = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton");
        var buttonConstructor = buttonClass.constructors.find(x => x.length === 6);
        
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

// Call function to create the main button
createMainButton();
