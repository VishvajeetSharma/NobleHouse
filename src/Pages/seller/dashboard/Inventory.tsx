import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStock } from "../../../redux/productSlice";

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const currentSeller =
    localStorage.getItem("currentSeller") || "default_seller";

  const sellerProducts = products.filter(
    (product: any) => product.sellerId === currentSeller,
  );

  const lowStock = sellerProducts.filter((product: any) =>
    product.sizeAvailability?.some((size: any) => size.stock <= 10),
  );

  const totalStock = sellerProducts.reduce(
    (sum: number, item: any) =>
      sum +
      (item.sizeAvailability?.reduce(
        (sub: number, size: any) => sub + (size.stock || 0),
        0,
      ) || 0),
    0,
  );

  const inventoryValue = sellerProducts.reduce(
    (sum: number, item: any) =>
      sum +
      (item.sizeAvailability?.reduce(
        (sub: number, size: any) => sub + (size.stock || 0) * (item.price || 0),
        0,
      ) || 0),
    0,
  );

  const sorted = useMemo(
    () =>
      [...sellerProducts].sort((a: any, b: any) => {
        const getStock = (p: any) =>
          p.sizeAvailability?.reduce(
            (sum: number, s: any) => sum + (s.stock || 0),
            0,
          ) || 0;
        return getStock(b) - getStock(a);
      }),
    [sellerProducts],
  );

  const getStockStatus = (product: any) => {
    if (!product.sizeAvailability)
      return { status: "No data", color: "bg-gray-100 text-gray-700" };
    if (product.sizeAvailability.every((s: any) => s.stock === 0))
      return { status: "Out of stock", color: "bg-red-100 text-red-700" };
    if (product.sizeAvailability.some((s: any) => s.stock <= 10))
      return { status: "Low stock", color: "bg-amber-100 text-amber-700" };
    return { status: "In stock", color: "bg-emerald-100 text-emerald-700" };
  };

  if (!sellerProducts.length) {
    return <div className="p-10 text-center">No Products</div>;
  }

  return (
    <div className="p-6 bg-[#f5f3ee] min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-6 flex justify-between">
          <h1 className="text-3xl font-semibold">Inventory</h1>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-xl">
              <p>Total Units</p>
              <h2>{totalStock}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p>Value</p>
              <h2>₹{inventoryValue}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p>Low Stock</p>
              <h2>{lowStock.length}</h2>
            </div>
          </div>
        </div>

        {/* LIST */}
        {sorted.map((product: any) => {
          const { status, color } = getStockStatus(product);
          return (
            <div
              key={product.id}
              className="bg-white p-4 mb-3 rounded-xl flex justify-between items-center"
            >
              <div className="flex gap-3 items-center">
                <img src={product.image} className="w-12 h-12 rounded" />
                <div>
                  <h3>{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {product.sizeAvailability?.map((size: any) => (
                  <div key={size.size} className="flex flex-col items-center">
                    <span className="text-xs">{size.size}</span>
                    <input
                      type="number"
                      value={size.stock}
                      onChange={(e) =>
                        dispatch(
                          updateStock({
                            id: product.id,
                            size: size.size,
                            stock: e.target.value,
                          }),
                        )
                      }
                      className="w-14 border px-1 text-center"
                    />
                  </div>
                ))}
              </div>

              <span className={`px-2 py-1 rounded ${color}`}>{status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inventory;
