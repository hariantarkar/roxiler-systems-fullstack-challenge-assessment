import { approveUser } from "../api/adminApi.js";

const PendingApprovals = ({ pendingUsers, onApproved }) => {
  const handleApprove = async (uid) => {
    await approveUser(uid);
    onApproved();
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">
          Pending Approvals{" "}
          {pendingUsers.length > 0 && <span className="badge bg-warning text-dark">{pendingUsers.length}</span>}
        </h5>

        {pendingUsers.length === 0 ? (
          <p className="text-muted mb-0">No accounts are waiting for approval right now.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-sm table-hover align-middle">
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th></th></tr>
              </thead>
              <tbody>
                {pendingUsers.map((u) => (
                  <tr key={u.uid}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td className="text-capitalize">{u.role.replace("_", " ")}</td>
                    <td>
                      <button className="btn btn-sm btn-success" onClick={() => handleApprove(u.uid)}>Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;