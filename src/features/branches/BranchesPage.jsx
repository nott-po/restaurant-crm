import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { HiFilter } from 'react-icons/hi';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGetBranchesQuery } from './branchesApi';
import { useBranches } from './useBranches';
import { Skeleton, BranchCardSkeleton, SkeletonGrid } from '../../shared/ui/Skeleton';
import {MAP_CONFIG} from "../../shared/constants/appConstants";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createMarkerIcon = (isSelected) => {
    return L.divIcon({
        html: `<div class="restaurant-marker ${isSelected ? 'selected' : 'default'}">🍽️</div>`, // did not find any better icon
        className: 'restaurant-marker-container',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

const Branches = () => {
    const { data, isLoading, error } = useGetBranchesQuery();
    const branches = data?.branches || [];

    const {
        selectedBranch,
        filterCuisine,
        cuisines,
        filteredBranches,
        toggleCuisineFilter,
        removeCuisineFilter,
        handleBranchClick,
    } = useBranches(branches);

    if (isLoading) {
        return (
            <div className="branches-page">
                <div className="branches-content">
                    <div className="branches-sidebar">
                        <div className="filter-tags" style={{ marginBottom: '16px' }}>
                            <Skeleton width="120px" height="18px" />
                        </div>
                        <div className="cuisine-filters">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} width="90px" height="32px" variant="rounded" />
                            ))}
                        </div>
                        <div className="branch-list">
                            <SkeletonGrid count={6} ItemSkeleton={BranchCardSkeleton} columns={1} gap="16px" />
                        </div>
                    </div>
                    <div className="branches-map" style={{ minHeight: '400px' }}>
                        <Skeleton height="100%" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="branches-page"><div className="error">Error loading branches</div></div>;
    }

    const mapCenter = MAP_CONFIG.DEFAULT_CENTER;

    return (
        <div className="branches-page">
            <div className="branches-content">
                <div className="branches-sidebar">
                    {filterCuisine.length > 0 && (
                        <div className="filter-tags">
                            <HiFilter className="filter-icon" size={16} />
                            {filterCuisine.map(cuisine => (
                                <span key={cuisine} className="filter-tag">
                                    {cuisine}
                                    <button onClick={() => removeCuisineFilter(cuisine)} className="remove-tag">×</button>
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="cuisine-filters">
                        {cuisines.map(cuisine => (
                            <button
                                key={cuisine}
                                className={`cuisine-filter-btn ${filterCuisine.includes(cuisine) ? 'active' : ''}`}
                                onClick={() => toggleCuisineFilter(cuisine)}
                            >
                                {cuisine}
                            </button>
                        ))}
                    </div>

                    <div className="branch-list">
                        {filteredBranches.map(branch => (
                            <div
                                key={branch.id}
                                className={`branch-card ${selectedBranch?.id === branch.id ? 'selected' : ''}`}
                                onClick={() => handleBranchClick(branch)}
                            >
                                <div className="branch-images">
                                    {branch.images.map((img, idx) => (
                                        <div key={idx} className="branch-image">
                                            <img src={img} alt={`${branch.name} dish ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                                <div className="branch-info">
                                    <div className="branch-name-row">
                                        <h3 className="branch-name">{branch.name}</h3>
                                        <span className="branch-distance">{branch.distance}</span>
                                    </div>
                                    <p className="branch-details">
                                        {branch.city} • {branch.cuisine} • {branch.priceRange}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="branches-map">
                    <MapContainer
                        center={mapCenter}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {filteredBranches.map(branch => (
                            <Marker
                                key={branch.id}
                                position={branch.coordinates}
                                icon={createMarkerIcon(selectedBranch?.id === branch.id)}
                                eventHandlers={{
                                    click: () => handleBranchClick(branch),
                                }}
                            >
                                <Popup>
                                    <div className="map-popup">
                                        <h4>{branch.name}</h4>
                                        <p>{branch.address}</p>
                                        <p>{branch.cuisine} • {branch.priceRange}</p>
                                        <span className={`status ${branch.isOpen ? 'open' : 'closed'}`}>
                                            {branch.isOpen ? 'Open Now' : 'Closed'}
                                        </span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default Branches;
