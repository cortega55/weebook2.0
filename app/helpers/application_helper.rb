module ApplicationHelper

  def current_user
    @current_user ||= session[:remember_token] && User.find(session[:remember_token])
  end

  def authenticate_user
    if !current_user
      flash[:danger] = "You must sign in"
      redirect_to new_sessions_path
    end
  end

  def sign_out
    session.delete(:remember_token)
    @current_user = nil
  end

  def sign_in(user)
    session[:remember_token] =user.id
    @current_user = user
  end
end
