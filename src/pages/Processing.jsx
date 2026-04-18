import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '../components/ProgressBar';
import Loader from '../components/Loader';
import { Brain, Mic, Scissors, Sparkles, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 'upload',
    title: 'Upload Complete',
    description: 'Video uploaded successfully',
    icon: CheckCircle,
    duration: 1000
  },
  {
    id: 'analyze',
    title: 'Analyzing Audio',
    description: 'Detecting speech patterns and emotional peaks',
    icon: Mic,
    duration: 3000
  },
  {
    id: 'ai',
    title: 'AI Processing',
    description: 'Finding the most engaging moments',
    icon: Brain,
    duration: 4000
  },
  {
    id: 'crop',
    title: 'Smart Cropping',
    description: 'Converting to vertical format for reels',
    icon: Scissors,
    duration: 2000
  },
  {
    id: 'captions',
    title: 'Generating Captions',
    description: 'Creating viral titles and subtitles',
    icon: Sparkles,
    duration: 2000
  }
];

export default function Processing({ setPage }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let timeout;
    if (currentStep < steps.length) {
      timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, steps[currentStep].duration);
    } else {
      setCompleted(true);
      setTimeout(() => setPage('results'), 2000);
    }
    return () => clearTimeout(timeout);
  }, [currentStep, setPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const target = ((currentStep + 1) / steps.length) * 100;
        if (prev >= target) return prev;
        return Math.min(prev + 2, target);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {!completed ? (
            <>
              <motion.div
                key={currentStep}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {React.createElement(steps[currentStep].icon, {
                    className: "w-12 h-12 text-primary"
                  })}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {steps[currentStep].title}
                </h1>
                <p className="text-xl text-gray-300">
                  {steps[currentStep].description}
                </p>
              </motion.div>

              <div className="mb-8">
                <ProgressBar progress={Math.round(progress)} label="Overall Progress" />
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index < currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <motion.div
                      key={step.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
                        isCompleted ? 'bg-green-500/10 border border-green-500/20' :
                        isCurrent ? 'glass' : 'bg-white/5'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isCurrent ? 'bg-primary' : 'bg-white/10'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className={`w-5 h-5 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className={`font-semibold ${isCompleted ? 'text-green-400' : isCurrent ? 'text-white' : 'text-gray-400'}`}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-400">
                Processing Complete!
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your viral reels are ready
              </p>
              <Loader message="Redirecting to results..." />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
