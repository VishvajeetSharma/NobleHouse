import { useState, useEffect } from "react";
import { FaHome, FaBuilding, FaMapMarkerAlt, FaTimes } from "react-icons/fa";

// Types
export interface Address {
  id?: number;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  addressType: "home" | "work" | "other";
  isDefault: boolean;
}

interface AddressFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Address) => void;
  editData?: Address | null;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const AddressForm: React.FC<AddressFormProps> = ({
  isOpen,
  onClose,
  onSave,
  editData = null,
}) => {
  const [formData, setFormData] = useState<Address>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "home",
    isDefault: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Populate form if editing
  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      // Reset form when adding new
      setFormData({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        addressType: "home",
        isDefault: false,
      });
    }
    setErrors({});
  }, [editData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Enter valid 10-digit phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    if (!formData.pincode.match(/^[0-9]{6}$/))
      newErrors.pincode = "Enter valid 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E7DCD7] animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-[#FAF7F2] border-b border-[#E7DCD7] px-6 py-4 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-[#241719] font-editorial">
              {editData ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white flex items-center justify-center transition-colors cursor-pointer border border-[#E7DCD7]/60"
            >
              <FaTimes size={14} className="text-[#241719]" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-1">
              Full Name <span className="text-[#B54745]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A66A75] focus:border-[#4A101C] transition text-sm text-[#241719] ${
                errors.fullName ? "border-[#B54745]" : "border-[#E7DCD7]"
              }`}
              placeholder="e.g. Riya Sharma"
            />
            {errors.fullName && (
              <p className="text-[#B54745] text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-1">
              Phone Number <span className="text-[#B54745]">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A66A75] focus:border-[#4A101C] transition text-sm text-[#241719] ${
                errors.phone ? "border-[#B54745]" : "border-[#E7DCD7]"
              }`}
              placeholder="10-digit mobile number"
            />
            {errors.phone && (
              <p className="text-[#B54745] text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-1">
              Address <span className="text-[#B54745]">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A66A75] focus:border-[#4A101C] transition text-sm text-[#241719] ${
                errors.address ? "border-[#B54745]" : "border-[#E7DCD7]"
              }`}
              placeholder="House No., Street, Area"
            />
            {errors.address && (
              <p className="text-[#B54745] text-xs mt-1">{errors.address}</p>
            )}
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-1">
                City <span className="text-[#B54745]">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A66A75] focus:border-[#4A101C] transition text-sm text-[#241719] ${
                  errors.city ? "border-[#B54745]" : "border-[#E7DCD7]"
                }`}
                placeholder="Mumbai"
              />
              {errors.city && (
                <p className="text-[#B54745] text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-1">
                State <span className="text-[#B54745]">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A66A75] focus:border-[#4A101C] transition text-sm text-[#241719] ${
                  errors.state ? "border-[#B54745]" : "border-[#E7DCD7]"
                }`}
                placeholder="Maharashtra"
              />
              {errors.state && (
                <p className="text-[#B54745] text-xs mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-1">
              Pincode <span className="text-[#B54745]">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              maxLength={6}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#A66A75] focus:border-[#4A101C] transition text-sm text-[#241719] ${
                errors.pincode ? "border-[#B54745]" : "border-[#E7DCD7]"
              }`}
              placeholder="400001"
            />
            {errors.pincode && (
              <p className="text-[#B54745] text-xs mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#75676A] mb-2">
              Address Type
            </label>
            <div className="flex gap-3">
              {[
                { value: "home" as const, label: "Home", icon: FaHome },
                { value: "work" as const, label: "Work", icon: FaBuilding },
                { value: "other" as const, label: "Other", icon: FaMapMarkerAlt },
              ].map((type) => (
                <label
                  key={type.value}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg cursor-pointer transition border text-sm font-medium ${
                    formData.addressType === type.value
                      ? "border-[#4A101C] bg-[#FAF7F2] text-[#4A101C]"
                      : "border-[#E7DCD7] text-[#75676A] hover:border-[#812D3A]"
                  }`}
                >
                  <input
                    type="radio"
                    name="addressType"
                    value={type.value}
                    checked={formData.addressType === type.value}
                    onChange={handleRadioChange}
                    className="hidden"
                  />
                  <type.icon size={13} />
                  <span className="capitalize">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Default Address Checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer py-1">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4 accent-[#4A101C]"
            />
            <span className="text-xs text-[#241719] font-medium">
              Set as default address
            </span>
          </label>

          {/* Form Actions */}
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-[#E7DCD7] text-[#75676A] font-medium rounded-lg hover:bg-[#FAF7F2] transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white font-medium rounded-lg hover:opacity-95 transition shadow-sm cursor-pointer"
            >
              {editData ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;