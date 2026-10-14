import { useState } from "react";

type Tab = "profile" | "store" | "payments" | "analytics";

interface SellerData {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  storeName: string;
  storeDescription: string;
  category: string;
  secondaryCategories: string[];
  gstNumber: string;
  panNumber: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  youtube: string;
  linkedin: string;
  emailNotifications: boolean;
  smsAlerts: boolean;
  vacationMode: boolean;
}

const CATEGORY_OPTIONS = [
  "Women's Fashion",
  "Men's Fashion",
  "Kids & Baby",
  "Jewelry & Accessories",
  "Beauty & Cosmetics",
  "Home & Living",
  "Electronics",
  "Sports & Outdoors",
  "Books & Media",
  "Art & Collectibles",
  "Handmade & Crafts",
  "Wedding & Events",
  "Vintage",
  "Pet Supplies",
  "Toys & Games",
  "Health & Wellness",
];

const Toggle = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    style={{
      position: "relative",
      width: 40,
      height: 22,
      borderRadius: 22,
      border: "none",
      background: checked ? "#185FA5" : "#d1d5db",
      cursor: "pointer",
      transition: "background 0.2s",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: "absolute",
        top: 3,
        left: checked ? 19 : 3,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "white",
        transition: "left 0.2s",
      }}
    />
  </button>
);

const ProgressBar = ({ value, color }: { value: number; color: string }) => (
  <div
    style={{
      height: 4,
      background: "#f3f4f6",
      borderRadius: 4,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${value}%`,
        height: "100%",
        background: color,
        borderRadius: 4,
        transition: "width 0.6s ease",
      }}
    />
  </div>
);

const SellerProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const [seller, setSeller] = useState<SellerData>({
    fullName: "Rajesh Mehta",
    email: "rajesh.mehta@example.com",
    phone: "+91 98765 43210",
    username: "rajesh_mehta",
    storeName: "Noble House",
    storeDescription:
      "Premium fashion & lifestyle store since 2015 — curated collection of ethnic wear, jewelry, and beauty products.",
    category: "Women's Fashion",
    secondaryCategories: ["Jewelry & Accessories", "Beauty & Cosmetics"],
    gstNumber: "27AAAAA1234B1Z",
    panNumber: "ABCDE1234F",
    address: "123, Fashion Avenue, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400093",
    website: "https://noblehouse.in",
    instagram: "@noble.house",
    facebook: "noblehouse",
    twitter: "@noblehouse",
    youtube: "noblehouse",
    linkedin: "company/noblehouse",
    emailNotifications: true,
    smsAlerts: true,
    vacationMode: false,
  });

  const [editDraft, setEditDraft] = useState<SellerData>(seller);

  const stats = [
    { label: "Products", value: "156", color: "#374151" },
    { label: "Orders", value: "3,420", color: "#374151" },
    { label: "Revenue", value: "₹42.5L", color: "#0F6E56" },
    { label: "Rating", value: "4.7★", color: "#BA7517" },
    { label: "Response", value: "98%", color: "#185FA5" },
    { label: "On-Time", value: "96%", color: "#0F6E56" },
  ];

  const tabs: { key: Tab; label: string }[] = [
    { key: "profile", label: "Profile" },
    { key: "store", label: "Store" },
    { key: "payments", label: "Payments" },
    { key: "analytics", label: "Analytics" },
  ];

  const handleDraftChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setEditDraft((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = () => {
    setSeller(editDraft);
    setIsEditing(false);
  };

  const handleEditStart = () => {
    setEditDraft(seller);
    setIsEditing(true);
  };

  const toggleSetting = (key: keyof SellerData) => {
    setSeller((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addSecondaryCategory = () => {
    if (
      newCategory &&
      !editDraft.secondaryCategories.includes(newCategory) &&
      CATEGORY_OPTIONS.includes(newCategory)
    ) {
      setEditDraft((prev) => ({
        ...prev,
        secondaryCategories: [...prev.secondaryCategories, newCategory],
      }));
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  const removeSecondaryCategory = (category: string) => {
    setEditDraft((prev) => ({
      ...prev,
      secondaryCategories: prev.secondaryCategories.filter(
        (c) => c !== category,
      ),
    }));
  };

  const card: React.CSSProperties = {
    background: "#ffffff",
    border: "0.5px solid #e5e7eb",
    borderRadius: 12,
    padding: "20px 24px",
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 500,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 16,
  };

  const fieldLabel: React.CSSProperties = {
    fontSize: 11,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: 4,
  };

  const fieldValue: React.CSSProperties = {
    fontSize: 14,
    color: "#111827",
  };

  const divider: React.CSSProperties = {
    height: "0.5px",
    background: "#f3f4f6",
    margin: "12px 0",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "7px 10px",
    border: "0.5px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
    background: "#f9fafb",
    color: "#111827",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9fafb",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Top Nav */}
      <div
        style={{
          background: "#fff",
          borderBottom: "0.5px solid #e5e7eb",
          padding: "0 32px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              background: "#185FA5",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            D
          </div>
          <span style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
            Seller Dashboard
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            {seller.storeName}
          </span>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#B5D4F4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0C447C",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {seller.fullName.charAt(0)}
          </div>
        </div>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 24px 48px" }}
      >
        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 10,
            marginBottom: 20,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "0.5px solid #e5e7eb",
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
                {s.label}
              </p>
              <p style={{ fontSize: 18, fontWeight: 500, color: s.color }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "#f3f4f6",
            padding: 4,
            borderRadius: 10,
            width: "fit-content",
            marginBottom: 20,
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{
                padding: "7px 18px",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                background: activeTab === t.key ? "#fff" : "transparent",
                color: activeTab === t.key ? "#111827" : "#6b7280",
                fontWeight: activeTab === t.key ? 500 : 400,
                boxShadow:
                  activeTab === t.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={card}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "#B5D4F4",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 500,
                        fontSize: 20,
                        color: "#0C447C",
                      }}
                    >
                      {seller.fullName.charAt(0)}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          color: "#111827",
                        }}
                      >
                        {seller.fullName}
                      </p>
                      <p style={{ fontSize: 12, color: "#9ca3af" }}>
                        @{seller.username}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(false)}
                          style={{
                            padding: "6px 14px",
                            border: "0.5px solid #d1d5db",
                            borderRadius: 8,
                            background: "transparent",
                            fontSize: 13,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            color: "#6b7280",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          style={{
                            padding: "6px 14px",
                            border: "none",
                            borderRadius: 8,
                            background: "#185FA5",
                            color: "white",
                            fontSize: 13,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            fontWeight: 500,
                          }}
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEditStart}
                        style={{
                          padding: "6px 14px",
                          border: "0.5px solid #d1d5db",
                          borderRadius: 8,
                          background: "transparent",
                          fontSize: 13,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          color: "#374151",
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div>
                      <p style={fieldLabel}>Full name</p>
                      <input
                        style={inputStyle}
                        name="fullName"
                        value={editDraft.fullName}
                        onChange={handleDraftChange}
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>Email</p>
                      <input
                        style={inputStyle}
                        name="email"
                        value={editDraft.email}
                        onChange={handleDraftChange}
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>Phone</p>
                      <input
                        style={inputStyle}
                        name="phone"
                        value={editDraft.phone}
                        onChange={handleDraftChange}
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>Address</p>
                      <input
                        style={inputStyle}
                        name="address"
                        value={editDraft.address}
                        onChange={handleDraftChange}
                      />
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 8,
                      }}
                    >
                      <div>
                        <p style={fieldLabel}>City</p>
                        <input
                          style={inputStyle}
                          name="city"
                          value={editDraft.city}
                          onChange={handleDraftChange}
                        />
                      </div>
                      <div>
                        <p style={fieldLabel}>State</p>
                        <input
                          style={inputStyle}
                          name="state"
                          value={editDraft.state}
                          onChange={handleDraftChange}
                        />
                      </div>
                      <div>
                        <p style={fieldLabel}>Pincode</p>
                        <input
                          style={inputStyle}
                          name="pincode"
                          value={editDraft.pincode}
                          onChange={handleDraftChange}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                      <p style={fieldLabel}>Email</p>
                      <p style={fieldValue}>{seller.email}</p>
                    </div>
                    <div style={divider} />
                    <div>
                      <p style={fieldLabel}>Phone</p>
                      <p style={fieldValue}>{seller.phone}</p>
                    </div>
                    <div style={divider} />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      <div>
                        <p style={fieldLabel}>City</p>
                        <p style={fieldValue}>{seller.city}</p>
                      </div>
                      <div>
                        <p style={fieldLabel}>State</p>
                        <p style={fieldValue}>{seller.state}</p>
                      </div>
                    </div>
                    <div style={divider} />
                    <div>
                      <p style={fieldLabel}>Address</p>
                      <p style={fieldValue}>
                        {seller.address}, {seller.pincode}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Settings card */}
              <div style={card}>
                <p style={sectionTitle}>Settings</p>
                {[
                  {
                    key: "emailNotifications" as keyof SellerData,
                    label: "Email notifications",
                    sub: "Order updates & alerts",
                  },
                  {
                    key: "smsAlerts" as keyof SellerData,
                    label: "SMS alerts",
                    sub: "New order notifications",
                  },
                  {
                    key: "vacationMode" as keyof SellerData,
                    label: "Vacation mode",
                    sub: "Pause new orders",
                  },
                ].map((item, i) => (
                  <div key={item.key}>
                    {i > 0 && <div style={divider} />}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 13, color: "#111827" }}>
                          {item.label}
                        </p>
                        <p style={{ fontSize: 11, color: "#9ca3af" }}>
                          {item.sub}
                        </p>
                      </div>
                      <Toggle
                        checked={seller[item.key] as boolean}
                        onChange={() => toggleSetting(item.key)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Business docs */}
              <div style={{ ...card, border: "0.5px solid #d1d5db" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <p style={{ ...sectionTitle, marginBottom: 0 }}>
                    Business documents
                  </p>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 500,
                      background: "#EAF3DE",
                      color: "#3B6D11",
                      padding: "3px 10px",
                      borderRadius: 20,
                    }}
                  >
                    Verified
                  </span>
                </div>
                {[
                  { label: "GST Number", value: seller.gstNumber },
                  { label: "PAN Number", value: seller.panNumber },
                ].map((field, i) => (
                  <div key={field.label}>
                    {i > 0 && <div style={divider} />}
                    <div style={{ padding: "10px 0" }}>
                      <p style={fieldLabel}>{field.label}</p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 4,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 14,
                            fontFamily: "monospace",
                            letterSpacing: "0.04em",
                            color: "#111827",
                          }}
                        >
                          {field.value}
                        </p>
                        <span
                          style={{
                            fontSize: 10,
                            color: "#9ca3af",
                            background: "#f9fafb",
                            padding: "2px 8px",
                            borderRadius: 4,
                          }}
                        >
                          Read only
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links - FULLY EDITABLE */}
              <div style={card}>
                <p style={sectionTitle}>Social Links</p>
                {isEditing ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div>
                      <p style={fieldLabel}>Instagram</p>
                      <input
                        style={inputStyle}
                        name="instagram"
                        value={editDraft.instagram}
                        onChange={handleDraftChange}
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>Facebook</p>
                      <input
                        style={inputStyle}
                        name="facebook"
                        value={editDraft.facebook}
                        onChange={handleDraftChange}
                        placeholder="facebook.com/username"
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>Twitter</p>
                      <input
                        style={inputStyle}
                        name="twitter"
                        value={editDraft.twitter}
                        onChange={handleDraftChange}
                        placeholder="@username"
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>YouTube</p>
                      <input
                        style={inputStyle}
                        name="youtube"
                        value={editDraft.youtube}
                        onChange={handleDraftChange}
                        placeholder="youtube.com/@channel"
                      />
                    </div>
                    <div>
                      <p style={fieldLabel}>Website</p>
                      <input
                        style={inputStyle}
                        name="Website"
                        value={editDraft.website}
                        onChange={handleDraftChange}
                        placeholder="https://www.yourwebsite.com"
                      />
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                      }}
                    >
                      <p style={{ fontSize: 13, color: "#6b7280" }}>
                        Instagram
                      </p>
                      <p style={{ fontSize: 13, color: "#185FA5" }}>
                        {seller.instagram || "—"}
                      </p>
                    </div>
                    <div style={divider} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                      }}
                    >
                      <p style={{ fontSize: 13, color: "#6b7280" }}>Facebook</p>
                      <p style={{ fontSize: 13, color: "#185FA5" }}>
                        {seller.facebook || "—"}
                      </p>
                    </div>
                    <div style={divider} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                      }}
                    >
                      <p style={{ fontSize: 13, color: "#6b7280" }}>Twitter</p>
                      <p style={{ fontSize: 13, color: "#185FA5" }}>
                        {seller.twitter || "—"}
                      </p>
                    </div>
                    <div style={divider} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                      }}
                    >
                      <p style={{ fontSize: 13, color: "#6b7280" }}>YouTube</p>
                      <p style={{ fontSize: 13, color: "#185FA5" }}>
                        {seller.youtube || "—"}
                      </p>
                    </div>
                    <div style={divider} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 0",
                      }}
                    >
                      <p style={{ fontSize: 13, color: "#6b7280" }}>Website</p>
                      <p style={{ fontSize: 13, color: "#185FA5" }}>
                        {seller.website || "—"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STORE TAB (Category + Website + Social) ── */}
        {activeTab === "store" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Store Details */}
            <div style={card}>
              <p style={sectionTitle}>Store Information</p>
              {isEditing ? (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  <div>
                    <p style={fieldLabel}>Store name</p>
                    <input
                      style={inputStyle}
                      name="storeName"
                      value={editDraft.storeName}
                      onChange={handleDraftChange}
                    />
                  </div>
                  <div>
                    <p style={fieldLabel}>Store description</p>
                    <textarea
                      style={{ ...inputStyle, minHeight: 80 }}
                      name="storeDescription"
                      value={editDraft.storeDescription}
                      onChange={handleDraftChange}
                    />
                  </div>
                  <div>
                    <p style={fieldLabel}>Website</p>
                    <input
                      style={inputStyle}
                      name="website"
                      value={editDraft.website}
                      onChange={handleDraftChange}
                      placeholder="https://yourstore.com"
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <p style={fieldLabel}>Store name</p>
                    <p style={fieldValue}>{seller.storeName}</p>
                  </div>
                  <div style={divider} />
                  <div>
                    <p style={fieldLabel}>Description</p>
                    <p style={{ ...fieldValue, color: "#6b7280" }}>
                      {seller.storeDescription}
                    </p>
                  </div>
                  <div style={divider} />
                  <div>
                    <p style={fieldLabel}>Website</p>
                    <p style={{ ...fieldValue, color: "#185FA5" }}>
                      {seller.website}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Category */}
            <div style={card}>
              <p style={sectionTitle}>Store Category</p>
              {isEditing ? (
                <div>
                  <p style={fieldLabel}>Primary Category</p>
                  <select
                    style={inputStyle}
                    name="category"
                    value={editDraft.category}
                    onChange={handleDraftChange}
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <p style={fieldLabel}>Primary Category</p>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#EAF3DE",
                      color: "#3B6D11",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {seller.category}
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Categories */}
            <div style={card}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <p style={{ ...sectionTitle, marginBottom: 0 }}>
                  Secondary Categories
                </p>
                {isEditing && (
                  <button
                    onClick={() => setShowAddCategory(true)}
                    style={{
                      fontSize: 11,
                      color: "#185FA5",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    + Add Category
                  </button>
                )}
              </div>
              {isEditing ? (
                <>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {editDraft.secondaryCategories.map((cat) => (
                      <div
                        key={cat}
                        style={{
                          background: "#f3f4f6",
                          padding: "4px 8px 4px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        {cat}
                        <button
                          onClick={() => removeSecondaryCategory(cat)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#9ca3af",
                            fontSize: 14,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {showAddCategory && (
                    <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                      <select
                        style={{ ...inputStyle, flex: 1 }}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                      >
                        <option value="">Select a category...</option>
                        {CATEGORY_OPTIONS.filter(
                          (c) =>
                            !editDraft.secondaryCategories.includes(c) &&
                            c !== editDraft.category,
                        ).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={addSecondaryCategory}
                        style={{
                          padding: "6px 16px",
                          background: "#185FA5",
                          color: "white",
                          border: "none",
                          borderRadius: 8,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddCategory(false)}
                        style={{
                          padding: "6px 16px",
                          background: "#f3f4f6",
                          border: "0.5px solid #d1d5db",
                          borderRadius: 8,
                          fontSize: 12,
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {seller.secondaryCategories.length > 0 ? (
                    seller.secondaryCategories.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          background: "#f3f4f6",
                          padding: "4px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                        }}
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>
                      No secondary categories added
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Social Links - Store tab mein bhi */}
            <div style={card}>
              <p style={sectionTitle}>Social Media Presence</p>
              {isEditing ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div>
                    <p style={fieldLabel}>Instagram</p>
                    <input
                      style={inputStyle}
                      name="instagram"
                      value={editDraft.instagram}
                      onChange={handleDraftChange}
                    />
                  </div>
                  <div>
                    <p style={fieldLabel}>Facebook</p>
                    <input
                      style={inputStyle}
                      name="facebook"
                      value={editDraft.facebook}
                      onChange={handleDraftChange}
                    />
                  </div>
                  <div>
                    <p style={fieldLabel}>Twitter</p>
                    <input
                      style={inputStyle}
                      name="twitter"
                      value={editDraft.twitter}
                      onChange={handleDraftChange}
                    />
                  </div>
                  <div>
                    <p style={fieldLabel}>YouTube</p>
                    <input
                      style={inputStyle}
                      name="youtube"
                      value={editDraft.youtube}
                      onChange={handleDraftChange}
                    />
                  </div>
                  <div>
                    <p style={fieldLabel}>LinkedIn</p>
                    <input
                      style={inputStyle}
                      name="linkedin"
                      value={editDraft.linkedin}
                      onChange={handleDraftChange}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                  }}
                >
                  <div>
                    <p style={fieldLabel}>Instagram</p>
                    <p style={fieldValue}>{seller.instagram || "—"}</p>
                  </div>
                  <div>
                    <p style={fieldLabel}>Facebook</p>
                    <p style={fieldValue}>{seller.facebook || "—"}</p>
                  </div>
                  <div>
                    <p style={fieldLabel}>Twitter</p>
                    <p style={fieldValue}>{seller.twitter || "—"}</p>
                  </div>
                  <div>
                    <p style={fieldLabel}>YouTube</p>
                    <p style={fieldValue}>{seller.youtube || "—"}</p>
                  </div>
                  <div>
                    <p style={fieldLabel}>LinkedIn</p>
                    <p style={fieldValue}>{seller.linkedin || "—"}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── PAYMENTS TAB ── */}
        {activeTab === "payments" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div style={card}>
              <p style={sectionTitle}>Balance</p>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 500,
                  color: "#111827",
                  marginBottom: 4,
                }}
              >
                ₹1,23,450
              </p>
              <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 16 }}>
                Next settlement: 15 May 2026
              </p>
              <ProgressBar value={62} color="#185FA5" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 6,
                }}
              >
                <p style={{ fontSize: 11, color: "#9ca3af" }}>
                  Settled ₹75,000
                </p>
                <p style={{ fontSize: 11, color: "#9ca3af" }}>
                  Pending ₹48,450
                </p>
              </div>
            </div>
            <div style={card}>
              <p style={sectionTitle}>Bank account</p>
              <div>
                <p style={fieldLabel}>Account number</p>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: "monospace",
                    color: "#111827",
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  XXXX XXXX 5678
                </p>
              </div>
              <div style={divider} />
              <div>
                <p style={fieldLabel}>IFSC code</p>
                <p
                  style={{
                    fontSize: 14,
                    fontFamily: "monospace",
                    color: "#111827",
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  SBIN0012345
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {activeTab === "analytics" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div style={card}>
              <p style={sectionTitle}>This month</p>
              {[
                { label: "Sales", value: "₹8,42,000" },
                { label: "Avg order value", value: "₹2,460" },
                { label: "Return rate", value: "2.3%", green: true },
                { label: "Customer satisfaction", value: "94%" },
              ].map((row, i) => (
                <div key={row.label}>
                  {i > 0 && <div style={divider} />}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <p style={{ fontSize: 13, color: "#6b7280" }}>
                      {row.label}
                    </p>
                    {row.green ? (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 500,
                          background: "#EAF3DE",
                          color: "#3B6D11",
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {row.value}
                      </span>
                    ) : (
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#111827",
                        }}
                      >
                        {row.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={card}>
              <p style={sectionTitle}>Performance</p>
              {[
                { label: "Response rate", value: 98, color: "#185FA5" },
                { label: "On-time delivery", value: 96, color: "#0F6E56" },
                { label: "Rating (4.7 / 5.0)", value: 94, color: "#BA7517" },
              ].map((metric) => (
                <div key={metric.label} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <p style={{ fontSize: 13, color: "#6b7280" }}>
                      {metric.label}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#111827",
                      }}
                    >
                      {metric.value}%
                    </p>
                  </div>
                  <ProgressBar value={metric.value} color={metric.color} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProfileDashboard;
