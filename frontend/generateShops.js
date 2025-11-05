          <div className="relative flex flex-col flex-1 max-w-150 max-h-150 p-5 md:p-10 items-center text-center bg-white rounded-xl shadow-md border">
            
            {/* Edit Icon */}
            {isOwner && (
              <button
                onClick={() => setShowShopModal(true)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                title="Edit Shop Info"
              >
                ✏️
              </button>
            )}

            
            {/* Logo */}
            <img
              src={shop.logo}
              alt={shop.shopname}
              className="hidden md:block w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow mb-4"
            />

            {/* Name */}
            <h1 className="hidden md:block text-3xl font-bold text-emerald-800 mb-2">{shop.shopname}</h1>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-gray-700 text-lg w-full max-w-2xl mt-2 mb-4">
              <div className="flex gap-3">
                <span className="font-semibold w-28">Address:</span>
                <span className="text-emerald-600">{shop.address}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">City:</span>
                <span className="text-emerald-600">{shop.city}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Category:</span>
                <span className="text-emerald-600">{shop.category}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Phone:</span>
                <span className="text-emerald-600">{shop.contactPhone}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Email:</span>
                <span className="text-emerald-600">{shop.contactEmail || "Not provided"}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-semibold w-28">Rating:</span>
                <span className="text-gold-200">⭐ {shop.rating?.toFixed(1) || "0.0"}</span>
              </div>
            </div>


            <button
              className="mt-2 bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-600 transition"
              onClick={() =>{
                let scrollTop;
                if(window.innerWidth >= 640){
                  scrollTop = 648;   // sm
                }
                else{
                  scrollTop = 740;
                }

                window.scrollTo(
                {
                  top:scrollTop,
                  behavior: 'smooth' 
                }
                )
              }}
            >
              Explore Our Products
            </button>

            {/* Description (optional) */}
            {shop.description && (
              <div className="flex gap-3 mt-2">
                <span className="font-semibold w-28">About Shop:</span>
                <p className="text-gray-600 max-w-lg">{shop.description}</p>
              </div>
            )}

          </div>