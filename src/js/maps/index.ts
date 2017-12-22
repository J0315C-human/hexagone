import demo from './demoMap';
import easyMaps from './easyMaps';
import mediumMaps from './mediumMaps';
import {sortMapByPosition} from '../utils/mapUtils';

export default [
  demo,
  ...easyMaps ,
  ...mediumMaps,
].map(sortMapByPosition); // .reverse();