function button_utility_script(inputArr, bindingClass) {
    // By ChatGPT (Modified for helpful use)
    var button = ModAPI.reflect.getClassById("net.minecraft.client.gui.GuiButton").constructors.find(x => x.length === 6);
    var originalActionPerformed = ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "actionPerformed")];
    var originalInit = ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "initGui")];

    var out = inputArr.flatMap(x => {
        return button(x.uid, x.x, x.y, x.w, x.h, ModAPI.util.str(x.text));
    });

    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "actionPerformed")] = function (...args) {
        var id = ModAPI.util.wrap(args[1]).getCorrective().id;
        var jsAction = inputArr.find(x => x.uid === id);
        if (jsAction) {
            jsAction.click(ModAPI.util.wrap(args[0]));
        }
        return originalActionPerformed.apply(this, args);
    }

    ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage(bindingClass, "initGui")] = function (...args) {
        originalInit.apply(this, args);
        var gui = ModAPI.util.wrap(args[0]).getCorrective();
        out.forEach(guiButton => {
            gui.buttonList.add(guiButton);
        });
    }
}

(() => {
    ModAPI.meta.title("Helpful Options Button");
    ModAPI.meta.description("Adds a useful button to the options menu.");
    ModAPI.meta.credits("by ChatGPT");

    var optionButtons = [
        {
            text: "Toggle Full Bright",
            click: () => {
                ModAPI.minecraft.gameSettings.gammaSetting = (ModAPI.minecraft.gameSettings.gammaSetting > 1.0) ? 1.0 : 10.0;
                alert("Brightness Set to " + (ModAPI.minecraft.gameSettings.gammaSetting > 1.0 ? "Max" : "Normal"));
            },
            x: 10,
            y: 10,
            w: 150,
            h: 20,
            uid: 142715300
        }
    ];

    // Add button to Options GUI only
    button_utility_script(optionButtons, "net.minecraft.client.gui.GuiOptions");
})();
