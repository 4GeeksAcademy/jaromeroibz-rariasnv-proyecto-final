"""empty message

Revision ID: d5fde3221a62
Revises: fe839ac95614
Create Date: 2023-11-02 00:37:57.229361

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd5fde3221a62'
down_revision = 'fe839ac95614'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('petitioner',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=False),
    sa.Column('phone_number', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(length=120), nullable=False),
    sa.Column('email_address', sa.String(length=120), nullable=False),
    sa.Column('offer_services', sa.String(length=120), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email_address'),
    sa.UniqueConstraint('phone_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('petitioner')
    # ### end Alembic commands ###