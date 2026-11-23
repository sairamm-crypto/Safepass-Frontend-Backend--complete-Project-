async findById(id: string): Promise<VisitorDocument> {
    try {
      const visitor = await this.visitorModel
        .findById(id)
        .populate('hostId', 'name email')
        .exec();

      if (!visitor) {
        throw new NotFoundException('Visitor not found');
      }

      return visitor;
    } catch (error) {
      // If it's a NotFoundException, re-throw it
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      // For other errors (like populate errors), try without population
      console.error('Error populating hostId in findById:', error);
      try {
        const visitor = await this.visitorModel.findById(id).exec();
        if (!visitor) {
          throw new NotFoundException('Visitor not found');
        }
        return visitor;
      } catch {
        throw new NotFoundException('Visitor not found');
      }
    }
  }
