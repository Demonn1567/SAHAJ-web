import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function AankhMain() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (storedLocation?.latitude && storedLocation?.longitude) {
      setLocation(storedLocation);
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(userLocation);
          localStorage.setItem("userLocation", JSON.stringify(userLocation));
          setShowLocationModal(false);
          setErrorMessage(null);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setErrorMessage("Failed to fetch location.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      handleUpload(file);
    }
  }, []);

  const handleUpload = async (file) => {
    const storedLocation = JSON.parse(localStorage.getItem("userLocation"));
    if (!file || !storedLocation?.latitude || !storedLocation?.longitude) {
      setErrorMessage("Please allow location access before uploading.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("latitude", storedLocation.latitude);
    formData.append("longitude", storedLocation.longitude);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/images/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      setUploadedImageUrl(response.data.image);
      setUploadProgress(100);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative">
      <div className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 shadow-lg flex justify-between items-center p-4">
        <button onClick={() => navigate("/")} className="text-white/80 hover:text-white transition-all duration-200">
          ← Back
        </button>
        <div className="text-3xl font-bold text-white">Aankh</div>
        <button
          className="px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200"
          onClick={() => setShowLocationModal(true)}
        >
          Get Your Location
        </button>
      </div>

      {showLocationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">At Sahaj, we do not store your location</h2>
            <p className="text-gray-600">We just take it for finding your nearest medical centres.</p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg" onClick={getLocation}>Allow Location Access</button>
            <button className="mt-2 text-red-600" onClick={() => setShowLocationModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">Find Your Medicine Instantly</h1>
        <p className="text-gray-600 mb-12">Upload a photo of your medicine or prescription, and we'll help you find it at nearby stores.</p>
        <div {...getRootProps()} className={`p-16 rounded-2xl border-3 border-dashed ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}>
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag & drop a medicine photo here, or click to browse</p>
        </div>

        {uploadedImageUrl && showSuccessModal && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-green-500 text-white p-4 rounded-lg shadow-md"
          >
            🎉 Image uploaded successfully!
          </motion.div>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      {location.latitude && location.longitude && (
        <div className="fixed bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg text-sm text-gray-700">
          📍 Your Location: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
        </div>
      )}
    </div>
  );
  }
