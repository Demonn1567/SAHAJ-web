import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button 
            whileHover={{ x: -5 }}
            onClick={() => navigate("/")} 
            className="flex items-center text-white/80 hover:text-white transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </motion.button>
          <div className="text-3xl font-bold text-white flex items-center">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Aankh
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-200 font-medium shadow-lg flex items-center"
            onClick={() => setShowLocationModal(true)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Get Location
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showLocationModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="mb-4 inline-block p-3 bg-blue-100 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Location Access</h2>
                <p className="text-gray-600 mb-6">We need your location to find nearby medical centers. We do not store this information.</p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                  onClick={getLocation}
                >
                  Allow Location Access
                </motion.button>
                <button 
                  className="text-gray-500 hover:text-gray-700 font-medium transition-colors duration-200"
                  onClick={() => setShowLocationModal(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Find Your Medicine Instantly</h1>
          <p className="text-gray-600 mb-12 text-lg">Upload a photo of your medicine or prescription, and we'll help you find it at nearby stores.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            {...getRootProps()} 
            className={`p-16 rounded-2xl border-3 border-dashed transition-all duration-200 relative overflow-hidden group
              ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white/80 backdrop-blur-sm"}
              hover:border-blue-400 hover:bg-blue-50/50`}
          >
            <input {...getInputProps()} />
            <div className="relative z-10">
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 text-lg mb-2">Drag & drop a medicine photo here</p>
                <p className="text-gray-500">or click to browse your files</p>
              </div>
              {uploading && (
                <div className="w-full max-w-xs mx-auto">
                  <div className="bg-blue-100 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="bg-blue-500 h-full rounded-full"
                    />
                  </div>
                  <p className="text-sm text-blue-600">{uploadProgress}% uploaded</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {uploadedImageUrl && showSuccessModal && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Image uploaded successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMessage}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {location.latitude && location.longitude && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg text-sm text-gray-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>
              {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
