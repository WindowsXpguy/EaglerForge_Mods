ModAPI.hooks.methods[ModAPI.util.getMethodFromPackage("net.minecraft.client.renderer.BlockRendererDispatcher", "renderBlock")] = function (blockState, pos, world, buffer) {
    if (!ModAPI.mc.theWorld || !ModAPI.mc.thePlayer) return false;

    var tileEntity = ModAPI.mc.theWorld.getTileEntity(pos);

    // If the block is a chest, render it normally
    if (tileEntity instanceof net.minecraft.tileentity.TileEntityChest) {
        return this.renderBlock(blockState, pos, world, buffer);
    }

    // Otherwise, make all other blocks invisible
    return false;
};
