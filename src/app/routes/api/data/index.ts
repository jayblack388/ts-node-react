import { Router } from 'express';
import { dataController } from '../../../controllers';

const router = Router();

router
	.route('/')
	.get(dataController.getAllData)
	.post(dataController.addData);
router
	.route('/:id')
	.get(dataController.getData)
	.put(dataController.updateData)
	.delete(dataController.deleteData);

export default router;
