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
            <p className="expiryDate">
                Valid until: {formatDate(voucher.enddate)}
            </p>
        </div>
    );
};

export default VoucherDetails;