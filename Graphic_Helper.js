(() => {
    ModAPI.require("player");
    
    // Force lower settings for better performance
    ModAPI.mc.gameSettings.renderDistanceChunks = 1; // Reduce render distance
    ModAPI.mc.gameSettings.fancyGraphics = false; // Disable fancy graphics
    ModAPI.mc.gameSettings.entityDistanceScaling = 0.5; // Reduce entity render distance
    ModAPI.mc.gameSettings.particleSetting = 2; // Minimal particles
    ModAPI.mc.gameSettings.smoothLighting = false; // Disable smooth lighting
    ModAPI.mc.gameSettings.vsync = false; // Disable V-Sync
    ModAPI.mc.gameSettings.mipmapLevels = 0; // Lower mipmap levels
    ModAPI.mc.gameSettings.limitFramerate = 20; // Set max FPS to 20
    ModAPI.mc.gameSettings.viewBobbing = false; // Disable view bobbing
    ModAPI.mc.gameSettings.entityShadows = false; // Disable entity shadows
    
    console.log("Performance settings applied for smoother gameplay.");
})();
