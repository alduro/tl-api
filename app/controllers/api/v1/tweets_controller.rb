class Api::V1::TweetsController < ApplicationController
  def index
    tweets = Tweet.where(user_id: current_user.id)
    render json: tweets
  end

  def create
  end

  def show
  end

  def update
  end

  def destroy
  end
end
