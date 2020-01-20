class Api::V1::UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :find_user, only: [:show, :update, :destroy]
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/:id
  def show
    render json: @user
  rescue ActiveRecord::RecordNotFound
    render json: { errors: 'User not found' }, status: :not_found
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :bad_request
    end
  end

  # PUT /users
  def update
    if @user
      @user.update(user_params)
      render json: {message: 'User successfully updated'}, status: :ok
    else
      render json: { errors: @user.errors.full_messages },
             status: :bad_request
    end
  end

  # DELETE /users/:id
  def destroy
    if @user
      @user.destroy
      render json: {message: 'User successfully removed'}, status: :ok
    else
      render json: { error: 'Unable to delete user' }, status: :bad_request
    end
  end

  def forgot
    if params[:email].blank?
      return render json: {error: 'Email not present'}
    end

    @user = User.find_by_email(params[:email].downcase)

    if @user.present?
      render json: {message: 'Ok'}, status: :ok
    else
      render json: {error: 'User not found'}, status: :not_found
    end
  end

  private
  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end

  def find_user
    @user = User.find(params[:id])
  end
end
