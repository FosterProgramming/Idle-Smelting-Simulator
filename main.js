import {gameLoop, uiLoop} from './modules/loop.js'
import {loadLocalStorage, exportSave, importSave, autoSave} from './modules/save.js'

loadLocalStorage()

setInterval(gameLoop, Game.settings.game_tick); 
setInterval(uiLoop, Game.settings.visual_tick);
setInterval(autoSave, 60000);

document.querySelector('#import').addEventListener('click', importSave)
document.querySelector('#export').addEventListener('click', exportSave)