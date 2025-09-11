import { useState, useEffect } from 'react';

// This service handles the prediction functionality using the ML model
const usePredictionService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to make prediction using the ML model
  const makePrediction = async (inputData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Prepare the input data for the model
      const modelInput = {
        hour: inputData.hour,
        weekday: inputData.weekday,
        electricity_consumed: inputData.electricity_consumed,
        temperature: inputData.temperature,
        humidity: inputData.humidity,
        wind_speed: inputData.wind_speed,
        avg_past_consumption: inputData.avg_past_consumption
      };

      // Make a request to the backend API (simulated here)
      // In a real implementation, this would be an API call to a backend that loads the model
      const response = await simulatePredictionRequest(modelInput);
      
      setPredictionResult(response.prediction);
      return response;
    } catch (err) {
      setError(err.message || 'An error occurred during prediction');
      return { success: false, error: err.message };
    } finally {
      // Add a delay to simulate processing time for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  // This function simulates a backend request
  // In a real implementation, this would be replaced with an actual API call
  const simulatePredictionRequest = async (modelInput) => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // For now, generate a random prediction between 0 and 1
        // This will be replaced with actual model prediction
        const randomPrediction = Math.random() > 0.5 ? 1 : 0;
        
        resolve({
          success: true,
          prediction: randomPrediction,
          confidence: Math.random() * 0.5 + 0.5, // Random confidence between 0.5 and 1
          input: modelInput
        });
      }, 1000);
    });
  };

  return {
    isLoading,
    predictionResult,
    error,
    makePrediction,
    resetPrediction: () => {
      setPredictionResult(null);
      setError(null);
    }
  };
};

export default usePredictionService;