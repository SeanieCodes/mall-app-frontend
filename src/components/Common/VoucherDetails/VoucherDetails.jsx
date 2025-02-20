import './VoucherDetails.css';

const VoucherDetails = ({ voucher, isInteractive = false }) => {
    if (!voucher) return null;
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className={`voucherDetails ${isInteractive ? 'hoverEffect' : ''}`}>
            <h3 className="storeName">{voucher.storeName}</h3>
            
            <div className="discountSection">
                <span className="discountAmount">{voucher.discount}</span>
            </div>
            
            <p className="description">{voucher.description}</p>
            
            <p className="expiryDate">
                Valid from: {formatDate(voucher.startDate)} to {formatDate(voucher.endDate)}
            </p>

            <p className="usageLimit">
                Usage per shopper: {voucher.usagePerShopper}
            </p>
        </div>
    );
};

export default VoucherDetails;