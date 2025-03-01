import { useState } from 'react';
import './UsageDetails.css';

const UsageDetails = ({ voucher }) => {
    if (!voucher) return <div className="noDataMessage">No voucher data available</div>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const totalRedemptions = voucher.redeemedBy?.length || 0;
    const uniqueUsers = new Set(voucher.redeemedBy?.map(redemption => redemption.user) || []).size;
    const usagePercentage = voucher.usagePerShopper > 0 
        ? Math.round((totalRedemptions / voucher.usagePerShopper) * 100) 
        : 0;

    return (
        <div className="usageDetailsContainer">
            <h3 className="usageTitle">Redemption Statistics</h3>
            
            <div className="statsGrid">
                <div className="statItem">
                    <span className="statLabel">Total Redemptions</span>
                    <span className="statValue">{totalRedemptions}</span>
                </div>
                
                <div className="statItem">
                    <span className="statLabel">Unique Shoppers</span>
                    <span className="statValue">{uniqueUsers}</span>
                </div>
                
                <div className="statItem">
                    <span className="statLabel">Global Usage</span>
                    <span className="statValue">{voucher.globalRedemptionCount || 0}</span>
                </div>
            </div>
            
            <div className="usageHistorySection">
                <h4 className="historyTitle">Redemption History</h4>
                
                {totalRedemptions > 0 ? (
                    <div className="redemptionList">
                        {(voucher.redeemedBy || []).map((redemption, index) => (
                            <div key={index} className="redemptionItem">
                                <span className="userInfo">User ID: {redemption.user}</span>
                                <span className="dateInfo">{formatDate(redemption.date)}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="noRedemptionsMessage">No redemptions yet</p>
                )}
            </div>
        </div>
    );
};

export default UsageDetails;