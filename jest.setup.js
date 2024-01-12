import '@testing-library/jest-dom';

import {TextEncoder, TextDecoder} from 'util';

//resolves Text Encoder en TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
