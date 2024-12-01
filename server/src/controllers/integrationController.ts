import { Request, Response } from 'express';
import Integration, { IIntegration } from '../models/Integration';

export const getIntegrations = async (req: Request, res: Response) => {
  try {
    const { search, category, status } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const integrations = await Integration.find(query);
    res.json(integrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching integrations', error });
  }
};

export const getIntegration = async (req: Request, res: Response) => {
  try {
    const integration = await Integration.findById(req.params.id);
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }
    res.json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching integration', error });
  }
};

export const createIntegration = async (req: Request, res: Response) => {
  try {
    const integration = new Integration(req.body);
    await integration.save();
    res.status(201).json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error creating integration', error });
  }
};

export const updateIntegration = async (req: Request, res: Response) => {
  try {
    const integration = await Integration.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }
    res.json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error updating integration', error });
  }
};

export const deleteIntegration = async (req: Request, res: Response) => {
  try {
    const integration = await Integration.findByIdAndDelete(req.params.id);
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }
    res.json({ message: 'Integration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting integration', error });
  }
};

export const toggleIntegration = async (req: Request, res: Response) => {
  try {
    const integration = await Integration.findById(req.params.id);
    if (!integration) {
      return res.status(404).json({ message: 'Integration not found' });
    }

    // Toggle the status
    integration.status = integration.status === 'connected' ? 'disconnected' : 'connected';
    
    // Simulate integration connection/disconnection process
    setTimeout(async () => {
      try {
        if (integration.status === 'connected') {
          integration.config.set('lastConnected', new Date());
          integration.config.set('connectionStatus', 'healthy');
        } else {
          integration.config.set('lastDisconnected', new Date());
          integration.config.delete('connectionStatus');
        }
        await integration.save();
      } catch (error) {
        integration.status = integration.status === 'connected' ? 'disconnected' : 'connected';
        await integration.save();
      }
    }, 2000);

    await integration.save();
    res.json(integration);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling integration', error });
  }
};
