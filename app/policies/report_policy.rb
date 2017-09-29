# Authorization policy for reports controller actions.
class ReportPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    user && user.id
  end

  def update?
    user && (user.has_role?(:admin) || user.id == record.user_id)
  end

  def destroy?
    update?
  end

  def batch_destroy?
    user && user.has_role?(:admin)
  end
end
