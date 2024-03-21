import mongoose from 'mongoose';

const disconnectDb = async () => {
    try {
      await mongoose.disconnect();
      console.log('Desconectado de MongoDB');
    } catch (error) {
      throw new Error(`Error al desconectar de MongoDB: ${error.message}`);
    }
  };
  

  export default disconnectDb