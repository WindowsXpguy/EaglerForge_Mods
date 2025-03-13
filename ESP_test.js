ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.renderer.entity.RenderGlobal", "doRenderEntityOutline")] = function (entity, partialTicks) {
    if (!ModAPI.mc.theWorld || !ModAPI.mc.thePlayer) return;
    
    // Get all tile entities in the world
    var tileEntities = ModAPI.mc.theWorld.loadedTileEntityList;

    tileEntities.forEach(tile => {
        if (tile instanceof net.minecraft.tileentity.TileEntityChest) {
            // Convert chest coordinates to render position
            var x = tile.getPos().getX() - ModAPI.mc.getRenderManager().viewerPosX;
            var y = tile.getPos().getY() - ModAPI.mc.getRenderManager().viewerPosY;
            var z = tile.getPos().getZ() - ModAPI.mc.getRenderManager().viewerPosZ;

            // Draw a green box around the chest
            ModAPI.minecraft.drawBoundingBox(x, y, z, x + 1, y + 1, z + 1, 0, 255, 0, 1); // Green color
        }
    });

    // Call original function to continue normal rendering
    return this.doRenderEntityOutline(entity, partialTicks);
};
