import map0 from './0';
import easyMaps from './easyMaps';
import mediumMaps from './mediumMaps';
import {sortMapByPosition} from '../utils/mapUtils';

export default [
	map0, 
	...mediumMaps,
	...easyMaps,
].map(sortMapByPosition);//.reverse();