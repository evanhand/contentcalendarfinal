import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { 
  getContentIdeas,
  getHashtagSuggestions,
  analyzeContent,
  transcribeVideo
} from '../controllers/tools.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.post('/content-ideas', getContentIdeas);
router.post('/hashtags', getHashtagSuggestions);
router.post('/analyze', analyzeContent);
router.post('/transcribe', transcribeVideo);

export { router as toolsRouter };