// This service handles loading and using the ML model

// Function to load the ML model
const loadModel = async () => {
  try {
    // In a real implementation, this would load the model from the server
    // For now, we'll simulate this process
    console.log('Loading ML model from: src/models/best.pkl');
    return { success: true, message: 'Model loaded successfully' };
  } catch (error) {
    console.error('Error loading model:', error);
    return { success: false, error: error.message };
  }
};

// Function to make a prediction using the loaded model
const predictWithModel = async (inputData) => {
  try {
    // Validate input data
    validateInputData(inputData);
    
    // In a real implementation, this would use the loaded model to make a prediction
    // For now, we'll use a simple algorithm that mimics the model's behavior
    
    // Use inputs directly since they are already in 0-1 range (except hour and weekday)
    const normalizedData = {
      hour: inputData.hour / 23, // Normalize to 0-1 range
      weekday: inputData.weekday / 6, // Normalize to 0-1 range
      electricity_consumed: inputData.electricity_consumed, // Already in 0-1 range
      temperature: inputData.temperature, // Already in 0-1 range
      humidity: inputData.humidity, // Already in 0-1 range
      wind_speed: inputData.wind_speed, // Already in 0-1 range
      avg_past_consumption: inputData.avg_past_consumption // Already in 0-1 range
    };
    
    // Simple algorithm to mimic model prediction
    // Higher values of these factors tend to indicate anomalies
    const anomalyScore = (
      (normalizedData.electricity_consumed > normalizedData.avg_past_consumption * 1.2 ? 0.4 : 0) +
      (normalizedData.hour >= 0.8 || normalizedData.hour <= 0.3 ? 0.2 : 0) + // Late night or early morning
      (normalizedData.temperature > 0.8 || normalizedData.temperature < 0.1 ? 0.2 : 0) + // Extreme temperatures
      (normalizedData.humidity > 0.9 || normalizedData.humidity < 0.2 ? 0.1 : 0) + // Extreme humidity
      (normalizedData.wind_speed > 0.7 ? 0.1 : 0) + // High wind speed
      Math.random() * 0.3 // Random factor to add variability
    );
    
    // Determine prediction (0 = normal, 1 = anomaly)
    const prediction = anomalyScore > 0.6 ? 1 : 0;
    
    return {
      success: true,
      prediction: prediction,
      confidence: prediction === 1 ? anomalyScore : 1 - anomalyScore,
      input: inputData
    };
  } catch (error) {
    console.error('Prediction error:', error);
    return { success: false, error: error.message };
  }
};

// Validate input data
const validateInputData = (data) => {
  const requiredFields = [
    'hour', 'weekday', 'electricity_consumed', 
    'temperature', 'humidity', 'wind_speed', 'avg_past_consumption'
  ];
  
  // Check if all required fields are present
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Validate ranges
  if (data.hour < 0 || data.hour > 23) {
    throw new Error('Hour must be between 0 and 23');
  }
  
  if (data.weekday < 0 || data.weekday > 6) {
    throw new Error('Weekday must be between 0 and 6');
  }
  
  if (data.electricity_consumed < 0 || data.electricity_consumed > 1) {
    throw new Error('Electricity consumption must be between 0.0 and 1.0');
  }
  
  if (data.temperature < 0 || data.temperature > 1) {
    throw new Error('Temperature must be between 0.0 and 1.0');
  }
  
  if (data.humidity < 0 || data.humidity > 1) {
    throw new Error('Humidity must be between 0.0 and 1.0');
  }
  
  if (data.wind_speed < 0 || data.wind_speed > 1) {
    throw new Error('Wind speed must be between 0.0 and 1.0');
  }
  
  if (data.avg_past_consumption < 0 || data.avg_past_consumption > 1) {
    throw new Error('Average past consumption must be between 0.0 and 1.0');
  }
};

export { loadModel, predictWithModel };