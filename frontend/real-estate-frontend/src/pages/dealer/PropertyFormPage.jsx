import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import PropertyFormWizard from '../../components/dealer/PropertyFormWizard';
import Alert from '../../components/Alert';
import {
  addProperty,
  updateProperty,
  fetchDealerPropertyById,
  fetchDealerPropertyImages,
  deletePropertyImage,
} from '../../api/services/dealerService';
import {
  buildPropertyRequestPayload,
  defaultPropertyForm,
  propertyToForm,
} from '../../utils/propertyHelpers';
import { dealerNav } from '../../utils/navConfig';

const steps = ['Property details', 'Features', 'Images'];

const PropertyFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState(defaultPropertyForm);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setLoading(true);
      try {
        const [property, images] = await Promise.all([
          fetchDealerPropertyById(id),
          fetchDealerPropertyImages(id),
        ]);
        setForm(propertyToForm(property));
        setExistingImages(images);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load property.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, isEdit]);

  const handleDeleteImage = async (imageId) => {
    try {
      await deletePropertyImage(imageId);
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
      setMessage('Image deleted.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete image.');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const payload = buildPropertyRequestPayload(form);

    try {
      if (isEdit) {
        await updateProperty(id, payload, imageFiles);
        setMessage('Property updated successfully.');
      } else {
        if (!imageFiles.length) {
          setError('Please upload at least one property image.');
          setLoading(false);
          return;
        }
        await addProperty(payload, imageFiles);
        setMessage('Property created successfully.');
      }
      setTimeout(() => navigate('/dealer/properties'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Failed to save property.');
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  return (
    <DashboardLayout
      title={isEdit ? 'Edit property' : 'Add property'}
      subtitle={`Step ${step + 1} of ${steps.length}: ${steps[step]}`}
      navLinks={dealerNav}
    >
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={message} onClose={() => setMessage('')} />

      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
        {loading && isEdit && step === 0 ? (
          <p className="text-sm text-gray-500">Loading property...</p>
        ) : (
          <>
            <PropertyFormWizard
              step={step}
              form={form}
              onChange={setForm}
              imageFiles={imageFiles}
              onImagesChange={setImageFiles}
              existingImages={existingImages}
              onDeleteImage={isEdit ? handleDeleteImage : null}
            />

            <div className="flex justify-between pt-2">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg disabled:opacity-40"
              >
                Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60"
              >
                {step === steps.length - 1 ? (loading ? 'Saving...' : 'Save property') : 'Continue'}
              </button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PropertyFormPage;