import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Footer}  from "../../../components/Footer/Footer";
import { useSelector } from "react-redux";
import Header from "../../../components/Header/Heading";
// import { clearCart } from "../../../redux/cartSlice";
import {
  FaArrowLeft,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import AddressForm from "../../../components/Checkout/AddressForm"; // Import the separate component
import type { Address } from "../../../components/Checkout/AddressForm";

// Address Card Component
const AddressCard = ({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: any) => {
  const getAddressIcon = () => {
    switch (address.addressType) {
      case "home":
        return <FaHome className="text-[#4A101C]" size={14} />;
      case "work":
        return <FaBuilding className="text-[#812D3A]" size={14} />;
      default:
        return <FaMapMarkerAlt className="text-[#75676A]" size={14} />;
    }
  };

  return (
    <div
      className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-[#4A101C] bg-[#FAF7F2] shadow-xs ring-1 ring-[#4A101C]/20"
          : "border-[#E7DCD7] bg-white hover:border-[#812D3A] hover:bg-[#FAF7F2]/40"
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getAddressIcon()}
            <span className="text-sm font-semibold text-[#241719] capitalize">
              {address.addressType || "Home"}
            </span>
            {address.isDefault && (
              <span className="text-xs bg-[#287653]/10 text-[#287653] border border-[#287653]/20 px-2 py-0.5 rounded-full font-medium">
                Default
              </span>
            )}
          </div>
          <p className="text-sm font-semibold text-[#241719]">
            {address.fullName}
          </p>
          <p className="text-sm text-[#75676A] mt-1">{address.address}</p>
          <p className="text-sm text-[#75676A]">
            {address.city}, {address.state} - {address.pincode}
          </p>
          <p className="text-sm text-[#75676A] mt-1">Phone: {address.phone}</p>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(address);
            }}
            className="p-2 hover:bg-[#F1E8E2] text-[#75676A] hover:text-[#4A101C] rounded-lg transition"
            title="Edit address"
          >
            <FaEdit size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address.id);
            }}
            className="p-2 hover:bg-red-50 text-[#75676A] hover:text-[#B54745] rounded-lg transition"
            title="Delete address"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
      {isSelected && (
        <div className="mt-3 pt-2.5 border-t border-[#E7DCD7]/60 flex items-center gap-1.5 text-[#4A101C] text-xs font-semibold">
          <FaCheckCircle size={13} />
          <span>Deliver to this address</span>
        </div>
      )}
    </div>
  );
};

const BuyNow = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const cartitem = useSelector((state: any) => state.cart.cartItems);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullName: "Riya Sharma",
      phone: "9876543210",
      address: "42, Linking Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      addressType: "home",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "Riya Sharma",
      phone: "9876543210",
      address: "WeWork, Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400093",
      addressType: "work",
      isDefault: false,
    },
  ]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // Calculate totals
  const subtotal = cartitem.reduce(
    (sum: number, item: any) => sum + (item.price || 0) * (item.quantity || 0),
    0,
  );
  const deliveryCharge = subtotal > 999 ? 0 : 99;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryCharge + gst;

  // Handle add new address
  const handleAddAddress = (newAddress: Address) => {
    const newId = Math.max(...addresses.map((a) => a.id??0), 0) + 1;
    const addressToAdd = {
      ...newAddress,
      id: newId,
    };

    if (newAddress.isDefault) {
      setAddresses(
        addresses
          .map((addr) => ({ ...addr, isDefault: false }))
          .concat(addressToAdd),
      );
      setSelectedAddress(addressToAdd);
    } else {
      setAddresses([...addresses, addressToAdd]);
    }
  };

  // Handle edit address
  const handleEditAddress = (address: any) => {
    setEditingAddress(address);
    setShowAddAddress(true);
  };

  // Handle save edited address
  const handleSaveEditedAddress = (updatedAddress: any) => {
    if (updatedAddress.isDefault) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === updatedAddress.id
            ? { ...updatedAddress, isDefault: true }
            : { ...addr, isDefault: false },
        ),
      );
    } else {
      setAddresses(
        addresses.map((addr) =>
          addr.id === updatedAddress.id ? updatedAddress : addr,
        ),
      );
    }
    setEditingAddress(null);
  };

  // Handle delete address
  const handleDeleteAddress = (id: any) => {
    if (addresses.length === 1) {
      alert("You need at least one address");
      return;
    }
    const newAddresses = addresses.filter((addr) => addr.id !== id);
    if (selectedAddress?.id === id) {
      const defaultAddr =
        newAddresses.find((addr) => addr.isDefault) || newAddresses[0];
      if (defaultAddr) {
        setSelectedAddress(defaultAddr);
      } else {
        setSelectedAddress(null);
      }
    }
    setAddresses(newAddresses);
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    window.scrollTo(0, 0);  
    navigate("/payment");
  };

  // Empty cart state
  if (cartitem.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E7DCD7] shadow-sm">
            <div className="text-5xl mb-4 text-[#812D3A]">🛒</div>
            <h2 className="text-2xl font-serif font-bold text-[#241719] mb-2">
              Your bag is empty
            </h2>
            <p className="text-[#75676A] text-sm mb-6">
              Looks like you haven't added any luxury pieces yet
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#4A101C] hover:bg-[#351019] text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF7F2] pb-16 py-6 px-4 md:py-10 md:px-12 lg:px-16">
        {/* Header Banner */}
        <div className="bg-white border border-[#E7DCD7] rounded-2xl p-5 md:p-6 mb-8 shadow-xs">
          <button
            onClick={() => navigate(-1)}
            className="md:hidden flex items-center gap-2 text-[#75676A] hover:text-[#4A101C] transition-colors group mb-3"
          >
            <FaArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-sm font-medium">Back</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#4A101C] to-[#812D3A] rounded-full"></div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#241719]">
                Select Delivery Address
              </h1>
              <p className="text-xs text-[#75676A] mt-0.5">Step 1 of 2: Confirm destination</p>
            </div>
          </div>
        </div>

        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Address Section */}
            <div className="lg:w-2/3">
              <div className="bg-white p-6 md:p-7 rounded-2xl border border-[#E7DCD7] shadow-xs">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E7DCD7]">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-[#241719]">
                      Saved Addresses
                    </h2>
                    <p className="text-xs text-[#75676A] mt-0.5">Select where your order should be delivered</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setShowAddAddress(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#FAF7F2] text-[#4A101C] border border-[#E7DCD7] hover:border-[#4A101C] hover:bg-[#E8D9C9]/30 rounded-xl transition font-medium text-sm shadow-xs"
                  >
                    <FaPlus size={11} />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {addresses.map((address: any) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={selectedAddress?.id === address.id}
                      onSelect={() => setSelectedAddress(address)}
                      onEdit={handleEditAddress}
                      onDelete={handleDeleteAddress}
                    />
                  ))}
                </div>

                {!selectedAddress && addresses.length > 0 && (
                  <div className="mt-5 p-3.5 bg-[#FAF7F2] border border-[#E8D9C9] rounded-xl text-[#812D3A] text-sm flex items-center gap-2">
                    <span className="font-medium">Please select a delivery address above to continue.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-2xl sticky top-24 border border-[#E7DCD7] shadow-xs">
                <h2 className="text-lg font-serif font-bold text-[#241719] mb-4 pb-3 border-b border-[#E7DCD7]">
                  Order Summary
                </h2>

                {/* Cart Items */}
                <div className="space-y-3.5 mb-5 max-h-80 overflow-y-auto pr-1">
                  {cartitem.map((item: any) => (
                    <div key={item.id} className="flex gap-3.5 p-2 rounded-xl hover:bg-[#FAF7F2]/60 transition border border-transparent hover:border-[#E7DCD7]/60">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 rounded-lg object-cover border border-[#E7DCD7]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-[#241719] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#75676A] mt-1">
                          Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-semibold text-[#4A101C]">
                            ₹{(item.price || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Details */}
                <div className="border-t border-[#E7DCD7] pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#75676A]">Subtotal</span>
                    <span className="text-[#241719] font-medium">
                      ₹{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#75676A]">Delivery Charges</span>
                    <span
                      className={
                        deliveryCharge === 0 ? "text-[#287653] font-semibold" : "text-[#241719] font-medium"
                      }
                    >
                      {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#75676A]">GST (5%)</span>
                    <span className="text-[#241719] font-medium">₹{gst}</span>
                  </div>
                  <div className="border-t border-[#E7DCD7] pt-3.5 mt-2">
                    <div className="flex justify-between items-center text-[#241719]">
                      <span className="font-serif font-bold text-base">Total</span>
                      <span className="text-xl font-serif font-bold text-[#4A101C]">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddress}
                  className={`w-full py-3.5 mt-5 font-semibold rounded-xl transition-all duration-200 tracking-wide text-sm ${
                    selectedAddress
                      ? "bg-gradient-to-r from-[#4A101C] to-[#812D3A] text-white hover:from-[#351019] hover:to-[#4A101C] shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
                      : "bg-[#F1E8E2] text-[#75676A] cursor-not-allowed border border-[#E7DCD7]"
                  }`}
                >
                  Proceed to Payment • ₹{total.toLocaleString()}
                </button>

                {/* Delivery Info */}
                <div className="mt-5 pt-4 border-t border-[#E7DCD7] space-y-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-[#75676A]">
                    <FaTruck size={13} className="text-[#4A101C]" />
                    <span>Free luxury delivery on orders above ₹999</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#75676A]">
                    <FaCreditCard size={13} className="text-[#4A101C]" />
                    <span>100% secure encrypted payment</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#75676A]">
                    <FaShieldAlt size={13} className="text-[#4A101C]" />
                    <span>NOBLE HOUSE authentic guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Address Modal */}
        <AddressForm
          isOpen={showAddAddress}
          onClose={() => {
            setShowAddAddress(false);
            setEditingAddress(null);
          }}
          onSave={editingAddress ? handleSaveEditedAddress : handleAddAddress}
          editData={editingAddress}
        />
      </div>
      <Footer />
    </>
  );
};

export default BuyNow;
