import { combineReducers } from "redux";
import { reducer as data } from "./data/data";
import { reducer as game } from "./game/game";
import { reducer as user } from "./user/user";
import { NAMES } from "./names";

export default combineReducers({
  [NAMES.DATA]: data,
  [NAMES.GAME]: game,
  [NAMES.USER]: user,
});
